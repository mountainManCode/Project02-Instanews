(function($){
  
    var runAjax = function(){
    
      var section = $('#select-section').val();
      var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
      url += '?' + $.param({
        'api-key': '9df5679a7cba4aa1b0c2e91351a6521c'
      });
      
      $('.gallery').children().remove();
      $('.gallery').append('<img class="loader" src="images/ajax-loader.gif"/>')
     
      
      if (section !== 'section'){
        $('header').removeClass('no-selection');
        $('header').addClass('active');
        $('.logo').addClass('active-logo');
      }
   
      if (section === 'section'){
        $('.loader').remove();
        $('header').addClass('no-selection');
        $('header').removeClass('active');
        $('.logo').removeClass('active-logo')
        return true; 
      } 
  
      $.ajax({
        url: url,
        method: 'GET',
      })
      .done(function(data) {
      
        $('.gallery').children().remove();


        var articleCounter = 0;
        $.each(data.results, function(i, value){
  
            if(value.multimedia.length === 0){
              return true;
            }
  
            var bestQuality = value.multimedia.length - 1;
            var backgroundImage = value.multimedia[bestQuality].url;
  
            var imageNumber = 'image-conatiner-'+i;
            var output = '<li class="gallery-item"><a href="';
            output += value.url;
            output += '"><div class="image-container ' + imageNumber + '">';
            output += '<p class="abstract pullUp">' + value.abstract + '</p>';
            output += '</div></a></li>';
            $('.gallery').append(output);
            
            $('.' + imageNumber).css({
              'background-image': 'url("' + backgroundImage + '")',
              'background-size': 'cover',
              'background-position': 'center',
              'height': '100%'
            });
  
            articleCounter ++;
        
            
            return (articleCounter !== 12);
        });
      })
      .fail(function(){
        var error = 0;
        $('.gallery').append('<li>Article cannot be retrieved.</li>');
        return error;
      });
    };
  
    runAjax();
  
    $('#select-section').on('change', function () {
      runAjax();
    });
  
    // selectric form styling
    $('select').selectric();
  }(jQuery));