document.addEventListener("DOMContentLoaded", function () {
  const organizersTeamSection = document.querySelector(
    "#organizers-team-section"
  );
  const teamSection = document.querySelector("#team-section");

  if (organizersTeamSection !== null) {
    let teamQuantity = organizersTeamSection.children.length;

    const orders = [...Array(teamQuantity).keys()];

    // console.log(orders);

    organizersTeamSection.childNodes.forEach((el) => {
      // console.log(el);

      const randomOrder = orders[Math.floor(Math.random() * teamQuantity)];
      orders.splice(randomOrder, 1);
      teamQuantity--;

      el.classList.add("order-" + randomOrder.toString());
    });

    teamSection.classList.remove("d-none");
  }
});