export function countdown(element, destinationDate) {
  const update = () => {
    const currentDate = Date.now();

    let msPerDay = 24 * 60 * 60 * 1000;
    let timeLeft = destinationDate - currentDate;
    let e_daysLeft = timeLeft / msPerDay;
    let daysLeft = Math.floor(e_daysLeft);

    let e_hrsLeft = (e_daysLeft - daysLeft) * 24;
    let hrsLeft = Math.floor(e_hrsLeft);

    let yearsLeft = 0;
    if (e_daysLeft > 365) {
      yearsLeft = Math.floor(e_daysLeft / 365);
      daysLeft = Math.floor(e_daysLeft % 365);
    }

    const minsLeft = Math.floor((e_hrsLeft - hrsLeft) * 60);
    element.innerHTML =
      translation(yearsLeft, "year") +
      translation(daysLeft, "day") +
      translation(hrsLeft, "hour") +
      translation(minsLeft, " minute");
  };

  if (destinationDate > Date.now()) {
    update();
    setInterval(() => {
      update();
    }, 1000 * 60);
  }
}

const translation = (number, str) => {
  if (number > 1) {
    str += "s";
  }
  return `${number} ${str} `;
};
