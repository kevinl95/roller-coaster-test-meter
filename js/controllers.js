angular.module('app.controllers', [])
  
.controller('rollerCoasterTestMeterCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    var time = []
    var lateral = []
    var vertical = []
    var ctx = document.getElementById("latChart");
    ctx.style.backgroundColor = 'rgba(39,81,19,0.9)';
    var vctx = document.getElementById("vertChart");
    vctx.style.backgroundColor = 'rgba(39,81,19,0.9)';
    var latChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: time,
                lineColor: "white",
                datasets: [
                  { 
                    data: lateral
                  }
                ]
              },
              options: {
                  title: {
                        display: true,
                        text: 'Lateral Gs',
                        fontColor: 'white',
                  },
                  legend: {
                        display: false,
                  },
                  scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true,
                                fontColor: 'white'
                            },
                        }],
                      xAxes: [{
                            ticks: {
                                fontColor: 'white'
                            },
                        }]
                  } 
              },
            });
    var vertChart = new Chart(vctx, {
              type: 'line',
              data: {
                labels: time,
                lineColor: "white",
                datasets: [
                  { 
                    data: vertical
                  }
                ]
              },
              options: {
                  title: {
                        display: true,
                        text: 'Vertical Gs',
                        fontColor: 'white',
                  },
                  legend: {
                        display: false,
                  },
                  scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true,
                                fontColor: 'white'
                            },
                        }],
                      xAxes: [{
                            ticks: {
                                fontColor: 'white'
                            },
                        }]
                  }
              },
            });
    var running = false;
    $scope.watchAcceleration = function(){
        running = true;
        var accelerometerOptions = {
              frequency: 1000
           }
           
            var watchID = navigator.accelerometer.watchAcceleration(
                accelerometerSuccess, accelerometerError, accelerometerOptions);

           function accelerometerSuccess(acceleration) {
               if(running){
                  var t = new Date(acceleration.timestamp);
                  time.push(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds());
                  lateral.push(acceleration.z/9.8);
                  vertical.push(acceleration.x/9.8);
                  latChart.update();
                  vertChart.update();
               }
           };
        
           function accelerometerError() {
              alert('onError!');
           };
    };
    
       
    $scope.endTest = function(){
       function rating(score){
           if (score<2.56){
              rate = 'Low';
           } else if (score >= 2.56 && score <= 5.12){
               rate = 'Medium';
           } else if (score >= 5.13 && score <= 7.68){
               rate = 'High';
           } else if (score >= 7.69 && score <= 10.24){
               rate = 'Very High';
           } else if (score >= 10.25 && score <= 12.79){
               rate = 'Extreme';
           } else if (score >= 12.8){
               rate = 'Ultra-Extreme';
           }
           return rate;
       }
       running = false;
       max_positive_g = Math.max(...vertical);
       max_negative_g = Math.min(...vertical);
       max_lateral_g = Math.max(...lateral);
       excitement=0.08*max_positive_g-0.24*Math.max(-2.5,max_negative_g)+0.4*Math.min(1.5,max_lateral_g);
       // Empirically derived multiplier
       excitement = excitement * 5.52884615385;
       intensity=0.8*max_positive_g+0.8*(1-max_negative_g)+max_lateral_g;
       // Empirically derived multiplier
       intensity = intensity * 0.82392026578;
       nausea=0.26*max_positive_g+0.22*(1-max_negative_g)+0.33*max_lateral_g;
       // Empirically derived multiplier
       nausea = nausea * 1.18965517241;
       exc_rating = rating(excitement);
       int_rating = rating(intensity);
       nau_rating = rating(nausea);
       document.getElementById("exc").innerHTML = "Excitement: " + excitement.toFixed(2) + ' (' + exc_rating + ')';
       document.getElementById("int").innerHTML = "Intensity: " + intensity.toFixed(2) + ' (' + int_rating + ')';
       document.getElementById("nau").innerHTML = "Nausea: " + nausea.toFixed(2) + ' (' + nau_rating + ')';
    };
    
    $scope.share = function(){
        var coaster_name = $scope.data.name
        if (coaster_name.length === 0){
            coaster_name = 'this roller coaster';
        }
        var message = {
            text: 'Roller Coaster Test Meter: If ' + coaster_name + ' were built in Roller Coaster Tycoon, it would have the following stats:' + '\n' + document.getElementById("exc").innerHTML + '\n' + document.getElementById("int").innerHTML + '\n' + document.getElementById("nau").innerHTML,
        };
        window.socialmessage.send(message);
    }
    
    $scope.clear = function(){
        time.length = 0;
        lateral.length = 0;
        vertical.length = 0;
        latChart.update();
        vertChart.update();
        $scaope.data.name = '';
    };
    
    $scope.data = {
        'name' : ''
    }

}])
 