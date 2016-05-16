$(document).ready(function () {

    var c = document.getElementById('photo');
    var v = document.getElementById('camera');
    var context = c.getContext('2d');
    var face;
    
    // bad mix of vanilla and jquery. ooops
    $('#sendbutton').click(function(eObject){
        sendImage();
        $('canvas').hide();
        $('#photoimg').show();
    })
    
    $('#resetbutton').click(function(eObject){
     
        $('canvas').show();
        $('#photoimg').hide();
        $("#emo").attr('src','');
        $("#emo").css({"width":0,"height":0});
    })


    navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
    if (navigator.getUserMedia) {
        // Request access to video only
        navigator.getUserMedia(
            {
                video: true,
                audio: false
            },
            function (stream) {
                var url = window.URL || window.webkitURL;
                v.src = url ? url.createObjectURL(stream) : stream;
                v.play();
                var c = document.getElementById('photo');
                var context = c.getContext('2d');
                context.drawImage(v, 0, 0, c.width, c.height);

            },
            function (error) {
                alert('Something went wrong. (error code ' + error.code + ')');
                return;
            }
            );
    }
    else {
        alert('Sorry, the browser you are using doesn\'t support getUserMedia');
        return;
    }

    function sendImage() {
        
       
        $("#feedback").text("Getting emotional capability");
            var url = c.toDataURL('image/jpeg');
            $("#photoimg").attr('src',url);
            console.log(url);
            $.ajax({
                url: '/image',
                type: 'PUT',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({ data: url }),
                error:function(result){
                    console.log(result);
                },
                success: function (data) { 
                    data = JSON.parse(data);
                    console.log(data)
                    face = data[0].faceRectangle;
                    updateFace(data[0]);
                    updateFields(data[0]);

                    $("#feedback").text(JSON.stringify(data)) }
            });
    }
    
    function updateFields(face){
        console.log($('.sadness'));
        $('.sadness').text("Sadness : "+face.scores.sadness);
        $('.happiness').text("Happiness : "+face.scores.happiness);
        $('.contempt').text("Contempt : "+face.scores.contempt);
        $('.disgust').text("Disgust : "+face.scores.disgust);
        $('.anger').text("Anger : "+face.scores.anger);
        $('.fear').text("Fear : "+face.scores.fear);
        $('.surprise').text("Surprise : "+face.scores.surprise);
        $('.neutral').text("Neutral : "+face.scores.neutral);
        
    }
    

    function updateFace(data){
       
        face = data.faceRectangle;
        scores = data.scores;
       
        var newscores=[];
        for(var i in scores){
           
          
            var item = {};
            item.score = parseFloat(scores[i]);
            item.name = i;
            
            newscores.push(item);
       
        }
       
        newscores.sort(compare);
        var item = newscores[newscores.length -1];
        var imagePath = getImage(item);
        var img = $("#emo");
        img.attr("src",imagePath);
        img.css({"width":face.width,"height":face.height,"top":face.top,"left":face.left,"position":"absolute"});


    }
    
    function compare(a,b) {
        if (a.score < b.score)
            return -1;
        else if (a.score > b.score)
            return 1;
        else 
            return 0;
    }


    
    function getImage(item){
        var path ='';
        console.log(item.name)
        switch(item.name){
            case "sadness":
              path = "images/sad.png";
              break;
            case "happiness":
              path = "images/smiling.png";
              break;
            case "contempt":
              path = "images/contempt.png";
              break;
            case "neutral":
              path = "images/neutral.png";
              break;
            case "disgust":
              path = "images/disgust.png";
              break;
            case "fear":
              path = "images/fear.png";
              break;
            case "surprise":
              path = "images/astonished-face.png";
              break;
              
           case "anger":
              path = "images/angry-face.png";
              break;
        }
        
        return path;
    }

    // Show the Image all the time
    function showImage() {
        context.drawImage(v, 0, 0, c.width, c.height);
        
    }

    setInterval(showImage, 1);
});









