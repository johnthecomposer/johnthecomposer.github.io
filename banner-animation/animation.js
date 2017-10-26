var bubblemaker = function(){
     var bubblecount = 20;
     var container = document.getElementById('main-container');
     for(var b = 0; b < bubblecount; b++){
          var bubble = document.createElement('div');
          var bubble_id = 'bubble-' + b;
          var random_offset = Math.floor(Math.random() * 50) - 10;
          var random_opacity = Math.random();
          bubble.classList.add('bubble');
          bubble.classList.add('offset-' + random_offset);
          bubble.id = bubble_id;
          container.append(bubble);
          TweenMax.to('#' + bubble_id, 0.1, {right: 133 + random_offset});
          TweenMax.to('#' + bubble_id, 2, {opacity: random_opacity, top: 85, delay: random_opacity});
          TweenMax.to('#' + bubble_id, 2, {opacity: 0, delay: random_opacity + 0.7});
     }

}
TweenMax.to(".product", 0.2, {opacity: 1});
TweenMax.to(".product", 2, {scale: 0.8, left: -175, top: -340});
TweenMax.to(".product", 2, {scale: 0.5, left: -210, top: -385, delay: 3});
TweenMax.to(".product", 2, {left: -45, top: -400, delay: 6});
TweenMax.to(".message", 1, {opacity: 1, delay: 7.5});
TweenMax.to(".message", 0.3, {opacity: 0, delay: 11});
TweenMax.to(".product", 0.5, {scale: 0.2, left: -150, top: -290, delay: 11});
TweenMax.to(".super", 0.3, {left: "5%", delay: 11.5});
TweenMax.to(".fresh", 0.3, {right: "4%", delay: 12, ease:Bounce.easeOut});
TweenMax.to(".super", 0.3, {left: "4%", delay: 12, ease:Bounce.easeOut});
TweenMax.to(".product", 2, {opacity: 0, delay: 12, onStart: bubblemaker});
TweenMax.to(".resolve", 1, {opacity: 1, delay: 12});
TweenMax.to(".link, .cta", 2, {opacity: 1, delay: 13});
