export const getReviewInterval = (box) => {
    switch (box) {
      case 1:
        return 1; // 1 day
      case 2:
        return 2; // 2 days
      case 3:
        return 4; // 4 days
      case 4:
        return 5; // 5 days
      case 5:
        return 8; // 8 days
      default:
        return 1; // Default to 1 day
    }
  };