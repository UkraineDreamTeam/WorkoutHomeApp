export const DUMBBELL_RANGE = Array.from(Array(40).keys()).map(el =>
  el.toString()
);
export const DUMBBELL_RANGE_GR = ['00', '25', '5'];
export const MINUTES = Array.from(Array(60).keys()).map(el =>
  `00${el}`.slice(-2)
);
export const SECONDS = Array.from(Array(60).keys()).map(el =>
  `00${el}`.slice(-2)
);

export const HOURS = Array.from(Array(12).keys()).map(el =>
  `00${el}`.slice(-2)
);
