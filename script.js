const letters = document.querySelectorAll(".row span");
const blop = new Audio("https://www.soundjay.com/button/sounds/button-16.mp3");

const burstColors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#F973FF", "#FF884B", "#00F5D4"];

const createLetterAnim = (elTarget, delay) => {
  return new mojs.Html({
    el: elTarget,
    duration: 500,
    delay: delay,
    opacity: { 0: 1 },
    scale: { 0: 1.5 },
    easing: "elastic.out",
  });
};

const createBurst = (elTarget, color) => {
  return new mojs.Burst({
    parent: elTarget,
    radius: { 0: 40 },
    count: 6,
    children: {
      shape: "circle",
      fill: color,
      radius: 8,
      duration: 600,
      easing: "cubic.out",
    }
  });
};

const playILoveYou = () => {
  const timeline = new mojs.Timeline();

  letters.forEach((letter, i) => {
    letter.style.opacity = 0;
    letter.style.transform = "scale(0)";
    timeline.add(createLetterAnim(letter, i * 300));
  });

  timeline.add(
    new mojs.Tween({
      delay: letters.length * 300 + 1500,
      onComplete: () => {
        letters.forEach((letter, i) => {
          const color = burstColors[i % burstColors.length];
          createBurst(letter, color).play();
          letter.style.opacity = 0;
        });
        blop.play();
      },
    })
  );

  return timeline;
};

const loopAnimation = () => {
  const run = () => {
    playILoveYou().play();
  };

  run();
  setInterval(run, 7000); // loop 7 detik
};

loopAnimation();
