export const getReviewInterval = (box) => {
    switch (box) {
      case 1:
        return 1; // 1 day
      case 2:
        return 2; // 3 days
      case 3:
        return 4; // 7 days
      case 4:
        return 5; // 14 days
      case 5:
        return 8; // 30 days
      default:
        return 1; // Default to 1 day
    }
  };