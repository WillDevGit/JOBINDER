import { showUserMatchedDetails } from "../chat/userMatchedDetails.js";

const parentElement = document.querySelector("#board");

if (parentElement) {
  let clickTimeout = null;
  let holdTimeout = null;
  let hasMoved = false; // Flag to track mouse movement

  // Double-click detection
  parentElement.addEventListener("click", (event) => {
    const card = event.target.closest(".card"); // Find the card element
    if (!card) return;

    // If a click is detected, check for a double-click
    if (clickTimeout) {
      clearTimeout(clickTimeout); // Clear single-click timeout
      clickTimeout = null;
      console.log("Double click detected on", card.id);
      showUserMatchedDetails(card.id);
    } else {
      // If no double-click is detected, set a single-click timeout
      clickTimeout = setTimeout(() => {
        clickTimeout = null; // Clear timeout after delay
      }, 400);
    }
  });

  // Hold detection
  parentElement.addEventListener("mousedown", (event) => {
    const card = event.target.closest(".card");
    if (!card) return;

    hasMoved = false; // Reset the movement flag
    console.log("Mousedown detected on", card.id);

    const onMouseMove = () => {
      hasMoved = true; // Set the flag if mouse moves during hold
    };

    // Listen for mouse movement
    document.addEventListener("mousemove", onMouseMove);

    holdTimeout = setTimeout(() => {
      document.removeEventListener("mousemove", onMouseMove); // Stop listening for movement
      // Trigger hold action only if no movement occurred
      if (!hasMoved) {
        console.log("Hold detected on", card.id);
        showUserMatchedDetails(card.id);
      }
      holdTimeout = null; // Clear hold timeout
    }, 800); // Hold duration

    card.addEventListener("mouseup", () => {
      if (holdTimeout) {
        clearTimeout(holdTimeout); // Cancel hold if released early
        holdTimeout = null;
      }
      document.removeEventListener("mousemove", onMouseMove); // Cleanup
    });

    card.addEventListener("mouseleave", () => {
      if (holdTimeout) {
        clearTimeout(holdTimeout); // Cancel hold if mouse leaves early
        holdTimeout = null;
      }
      document.removeEventListener("mousemove", onMouseMove); // Cleanup
    });
  });
}
