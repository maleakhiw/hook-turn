from telegram_bot import Telegram_Bot, command, inline, inline_callback, chosen_inline, checked
from difflib import get_close_matches
import json, subprocess, requests, dateutil.parser, datetime
from dateutil.tz import tzlocal
from pprint import pprint

token = '366664227:AAGeagtkHnLQzVHDB_m8EtI7OY-7dZIlYqM'  # Bot API token here

bot = Telegram_Bot(token)
send = bot.sender

class HookTurns:
    url = "http://hookturns.krusli.me/departures"
    def __init__(self):
        with open('tramstops.json') as tramstops_file:
            stops = json.load(tramstops_file)['stops']
            self.tram_stops = {stop['stop_name']: stop for stop in stops}
    def get_departures(self, stop_name):
        # look for stop name
        matches = get_close_matches(stop_name, self.tram_stops.keys())
        if len(matches) == 0:
            return "No stops found for " + stop_name
        else:
            best_match = matches[0]
            print(best_match)
            # get the stop_id
            stop_id = self.tram_stops[best_match]['stop_id']
            results = json.loads(requests.get(self.url, params=dict(stopid=stop_id)).text)
            # pprint(results)
            departures = results['ptvData']['departures']
            stops = results['ptvData']['stops']
            routes = results['ptvData']['routes']
            directions = results['ptvData']['directions']

            output = "Departures for {}\n".format(stops[str(stop_id)]['stop_name'])

            # sort by departure time
            departures = sorted(departures, key=lambda departure: dateutil.parser.parse(departure['scheduled_departure_utc']))


            for departure in departures:
                scheduled_departure = dateutil.parser.parse(departure['scheduled_departure_utc'])
                if (scheduled_departure < datetime.datetime.now(tzlocal())):    # already departed
                    time_to_departure = datetime.timedelta(0, 0)
                else:
                    time_to_departure = scheduled_departure - datetime.datetime.now(tzlocal())
                time_to_departure = time_to_departure.seconds
                hours_to_departure = time_to_departure//3600
                mins_to_departure = time_to_departure//60 % 60
                secs_to_departure = time_to_departure - hours_to_departure*3600 - mins_to_departure*60
                if hours_to_departure == 0 and mins_to_departure == 0:
                    time_str = 'Now'
                elif hours_to_departure == 0:
                    if mins_to_departure == 1:
                        time_str = 'in 1 min'
                    else:
                        time_str = 'in {} mins'.format(mins_to_departure)
                else:
                    if mins_to_departure == 1:
                        time_str = 'in 1 min'
                    else:
                        time_str = 'in {} mins'.format(mins_to_departure)
                    if hours_to_departure == 1:
                        time_str = 'in {} hour {}'.format(hours_to_departure, time_str)
                    else:
                        time_str = 'in {} hours {}'.format(hours_to_departure, time_str)


                output += "Route {} to {} - {}\n".format(routes[str(departure['route_id'])]['route_number'], \
                            directions[str(departure['direction_id'])]['direction_name'], \
                            time_str)
            return output


hook_turns = HookTurns()

@command.define('/gitpull')
def pull(message):
    try:
        output = subprocess.check_output("git pull", shell=True)
    except Exception as e:
        output = e
    send.message_reply(message.chat_id, output, message.message_id)

@command.define('/departures')
def departures(message):
    print(message.text)
    if message.argument_count < 2:
        send.markdown_reply(message.chat_id, '`Usage: /departures melboune university`', message.message_id)
    else:
        send.message_reply(message.chat_id, hook_turns.get_departures(' '.join(message.get_arguments()[1:])), message.message_id)

if __name__ == '__main__':
    print('Running bot.')
    bot.run()
