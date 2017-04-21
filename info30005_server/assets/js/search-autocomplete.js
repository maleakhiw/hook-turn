var keyword = [
    { value: 'Southern Cross Station'},
    { value: 'Melbourne University Stop'}
  ];
  
  // Setup autocomplete function pulling from keyword array
$('#autocomplete').autocomplete({
    lookup: keyword,
});
  