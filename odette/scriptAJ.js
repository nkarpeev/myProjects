$(function() {
	
			//range slider
	
        $("#price-filter").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 5000000,
            max: 25000000,
            from: 5000000,
            to: 25000000,
            type: 'double',
            step: 500000,
            postfix: " руб.",
            grid: false,
            onFinish: function () {
            	ajaxMainFunction();
            }
        });

	        $("#area-filter").ionRangeSlider({
	            hide_min_max: true,
	            keyboard: true,
	            min: 10,
	            max: 230,
	            from: 10,
	            to: 230,
	            type: 'double',
	            step: 10,
	            postfix: " m<sup><small>2</small></sup>",
	            grid: false,
	            onFinish: function () {
            	ajaxMainFunction();
            	}
	        });
	
			// range slider reset button
		
		$('#range-reset').click(function() {
			var resetPrice = $("#price-filter").data("ionRangeSlider");
			var resetArea = $("#area-filter").data("ionRangeSlider");
			resetPrice.reset();
			resetArea.reset();
		});
		
			//check active floor
		
		$('.floor-filter-btn').click(function() {
			var floor = $(this).data('floor');
			$('#floor-filter').val(floor);
			
			var ID = $(this).attr('id');
			$(this).addClass('active-btn');
			console.log(ID);
			$('.floor-filter-btn').not(document.getElementById(ID)).removeClass('active-btn');

			ajaxMainFunction();
		});
		
		
			
			var ID_polygon,
				objectList,
			 	floorList,
				searchResult,
				i = 0;
				
			var ident,
				status;
				
			var	mainObjectList = [];
				
				
		function getMainObjectList() {
			
			$(".appart").map(function(){
				
				ident =  $(this).attr("id");
			    status =  $(this).data("status");
				
				mainObjectList[i] = {
					id: ident,
					status: status
				};
				
				i++;
				
			}).get();
			
			console.log(mainObjectList);
		}
		
			//собираем id сгенерированных квартир на странице
		function getObjectList() {
		
			objectList = $(".appart").map(function(){
			    return $(this).attr("id");
			}).get();
			console.log(objectList);

		}
			//собираем data квартир на поэтажном плане
		function getFloorList() {
			
			floorList = $(".legato-class-80").map(function(){
			    return $(this).data('ident');
			}).get();
			
			//console.log(floorList);
		}
			console.log('Объект');
			getMainObjectList();
			getObjectList();
			getFloorList();
			
			 //ищем совпадения отфильтрованных квартир на поэтажном плане
		function searchInObjectList() {

			$.each(floorList, function(index, value) {
					for(var key in mainObjectList) {
						if('id-appart-'+ value == mainObjectList[key].id) {
							//console.log(key + ': id-appart-'+ value + '; ' + mainObjectList[key].id);
							$(".legato-class-80").addClass('my-ultra-class');
							$("#polygon-" + value).attr('data-status', mainObjectList[key].status);
						}
					}
				});
			}
		
			searchInObjectList();
			
				// установим обработчик события hover, элементу с классом legato-class-80
		$('.legato-class-80').hover(
			function(pos){
			  ID_polygon = $(this).data('ident');
				
			  $.each(objectList, function(index, value) {

				if(value == 'id-appart-' + ID_polygon) {
					setTimeout(function() {
					console.log('value: ' + value);
					console.log('ID_polygon: id-appart-' + ID_polygon);
					$('#polygon-' + ID_polygon).addClass('my-super-class');
					
					//console.log(pos.pageX + pos.pageY);
					
					var showStatus = $('#polygon-' + ID_polygon).data('status');
					console.log(showStatus);
      				$("#show-status-object").html(showStatus).css('left',(pos.pageX+10)+'px').css('top',(pos.pageY+10)+'px');
					$("#show-status-object").show();
					
					}, 1000);
				}	
			});
		},
			function(){
				$(".legato-class-80").removeClass('my-super-class');
				$("#show-status-object").hide();
			});
		
		
		
		$("#sold").hide();
  $("#free").hide();
  $("#reserved").hide();
  $("#office-4").hide();
  $(document).ready(function(){
    $(".room-sold").mousemove(       
      function (pos) { 
    $("#sold").show();
      $("#sold").css('left',(pos.pageX+10)+'px').css('top',(pos.pageY+10)+'px');          
      }    
    ).mouseleave(function() {
      $("#sold").hide(); 
    });
  });
  $(document).ready(function(){
    $(".room-free").mousemove(       
      function (pos) { 
    $("#free").show();
      $("#free").css('left',(pos.pageX+10)+'px').css('top',(pos.pageY+10)+'px');          
      }    
    ).mouseleave(function() {
      $("#free").hide(); 
    });
  });
  $(document).ready(function(){
    $(".room-reserved").mousemove(       
      function (pos) { 
    $("#reserved").show();
      $("#reserved").css('left',(pos.pageX+10)+'px').css('top',(pos.pageY+10)+'px');          
      }    
    ).mouseleave(function() {
      $("#reserved").hide(); 
    });
  });
  $(document).ready(function(){
    $("#legato-office-4").mousemove(       
      function (pos) { 
    $("#office-4").show();
      $("#office-4").css('left',(pos.pageX+10)+'px').css('top',(pos.pageY+10)+'px');          
      }    
    ).mouseleave(function() {
      $("#office-4").hide(); 
    });
  });
			
			

    //MODx pdoResources Ajax Filter
    //Filter Settings
    var fadeSpeed             = 200, // Fade Animation Speed
        ajaxCountSelector     = '.ajax-count', // CSS Selector of Items Counter
        ajaxContainerSelector = '.ajax-container', // CSS Selector of Ajax Container
        ajaxItemSelector      = '.ajax-item', // CSS Selector of Ajax Item
        ajaxFormSelector      = '.ajax-form', // CSS Selector of Ajax Filter Form
        ajaxFormButtonStart   = '.ajax-start', // CSS Selector of Button Start Filtering
        ajaxFormButtonReset   = '.ajax-reset', // CSS Selector of Button Reset Ajax Form
        sortDownText          = 'По убыванию',
        sortUpText            = 'По возрастанию';

    function ajaxCount() {
    	
        if($('.ajax-filter-count').length) {
            var count = $('.ajax-filter-count').data('count');
            $(ajaxCountSelector).text(count);
        } else {
            $(ajaxCountSelector).text($(ajaxItemSelector).length);
        }
    }ajaxCount();

    function ajaxMainFunction() {
    	
        $.ajax({
            data: $(ajaxFormSelector).serialize()
        }).done(function(response) {
            var $response = $(response);
            $(ajaxContainerSelector).fadeOut(fadeSpeed);
            setTimeout(function() {
                $(ajaxContainerSelector).html($response.find(ajaxContainerSelector).html()).fadeIn(fadeSpeed);
                ajaxCount();
            }, fadeSpeed);
        }).done(function() {
        	
	        setTimeout(function() {
				getObjectList();
				searchInObjectList();
				}, 2000);
        	
        
        });	
    }

    $(ajaxContainerSelector).on('click', '.ajax-more', function(e) {
        e.preventDefault();
        var offset = $(ajaxItemSelector).length;
        $.ajax({
            data: $(ajaxFormSelector).serialize()+'&offset='+offset
        }).done(function(response) {
            $('.ajax-more').remove();
            var $response = $(response);
            $response.find(ajaxItemSelector).hide();
            $(ajaxContainerSelector).append($response.find(ajaxContainerSelector).html());
            $(ajaxItemSelector).fadeIn();
        });
    })

    $(ajaxFormButtonStart).click(function(e) {
        e.preventDefault();
        ajaxMainFunction();
    })

    $(ajaxFormButtonReset).click(function(e) {
        e.preventDefault();
        $(ajaxFormSelector).trigger('reset');
        $('input[name=sortby]').val('pagetitle');
        $('input[name=sortdir]').val('asc');
        setTimeout(function() {
            $('[data-sort-by]').data('sort-dir', 'asc').toggleClass('button-sort-asc').text(sortUpText);
        }, fadeSpeed);
        ajaxMainFunction();
        ajaxCount();
    })

    $(''+ajaxFormSelector+' .change_filter').change(function() {
        ajaxMainFunction();
    })

    $('[data-sort-by]').data('sort-dir', 'asc').click(function() {
        var ths = $(this);
        $('input[name=sortby]').val($(this).data('sort-by'));
        $('input[name=sortdir]').val($(this).data('sort-dir'));
        setTimeout(function() {
            $('[data-sort-by]').not(this).toggleClass('button-sort-asc').text(sortUpText);
            ths.data('sort-dir') == 'asc' ? ths.data('sort-dir', 'desc').text(sortDownText) : ths.data('sort-dir', 'asc').text(sortUpText);
            $(this).toggleClass('button-sort-asc');
        }, fadeSpeed);
        ajaxMainFunction();
    });

});