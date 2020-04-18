export const chmodHandler = (rule, isSymbolic = false) => {
  if (isSymbolic) {
    switch (JSON.stringify(rule)) {
      case JSON.stringify({ r: false, w: false, x: false }):
        return 0;
      case JSON.stringify({ r: false, w: false, x: true }):
        return 1;
      case JSON.stringify({ r: false, w: true, x: false }):
        return 2;
      case JSON.stringify({ r: false, w: true, x: true }):
        return 3;
      case JSON.stringify({ r: true, w: false, x: false }):
        return 4;
      case JSON.stringify({ r: true, w: false, x: true }):
        return 5;
      case JSON.stringify({ r: true, w: true, x: false }):
        return 6;
      case JSON.stringify({ r: true, w: true, x: true }):
        return 7;
    }
  }
  switch (rule) {
    case 0:
      return { r: false, w: false, x: false };
    case 1:
      return { r: false, w: false, x: true };
    case 2:
      return { r: false, w: true, x: false };
    case 3:
      return { r: false, w: true, x: true };
    case 4:
      return { r: true, w: false, x: false };
    case 5:
      return { r: true, w: false, x: true };
    case 6:
      return { r: true, w: true, x: false };
    case 7:
      return { r: true, w: true, x: true };
  }
}

export default {
  chmodHandler
}
