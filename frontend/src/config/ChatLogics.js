// export const isSameSenderMargin = (messages, m, i, userId) => {
//   // console.log(i === messages.length - 1);

//   if (
//     i < messages.length - 1 &&
//     messages[i + 1].sender._id === m.sender._id &&
//     messages[i].sender._id !== userId
//   )
//     return 33;
//   else if (
//     (i < messages.length - 1 &&
//       messages[i + 1].sender._id !== m.sender._id &&
//       messages[i].sender._id !== userId) ||
//     (i === messages.length - 1 && messages[i].sender._id !== userId)
//   )
//     return 0;
//   else return "auto";
// };

// export const isSameSender = (messages, m, i, userId) => {
//   return (
//     i < messages.length - 1 &&
//     (messages[i + 1].sender._id !== m.sender._id ||
//       messages[i + 1].sender._id === undefined) &&
//     messages[i].sender._id !== userId
//   );
// };

// export const isLastMessage = (messages, i, userId) => {
//   return (
//     i === messages.length - 1 &&
//     messages[messages.length - 1].sender._id !== userId &&
//     messages[messages.length - 1].sender._id
//   );
// };

// export const isSameUser = (messages, m, i) => {
//   return i > 0 && messages[i - 1].sender._id === m.sender._id;
// };

// export const getSender = (loggedUser, users) => {
//   return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
// };

// export const getSenderFull = (loggedUser, users) => {
//   return users[0]._id === loggedUser._id ? users[1] : users[0];
// };



// Determine the margin for the message to adjust spacing based on who sent it
export const isSameSenderMargin = (messages, currentMessage, index, userId) => {
  // If the next message is from the same sender and the current message is not from the logged-in user
  if (
    index < messages.length - 1 &&
    messages[index + 1].sender._id === currentMessage.sender._id &&
    currentMessage.sender._id !== userId
  ) {
    return 33; // Add a margin to separate messages from different users
  } 
  // If the next message is from a different sender or it's the last message and the sender is not the logged-in user
  else if (
    (index < messages.length - 1 &&
      messages[index + 1].sender._id !== currentMessage.sender._id &&
      currentMessage.sender._id !== userId) ||
    (index === messages.length - 1 && currentMessage.sender._id !== userId)
  ) {
    return 0; // No margin needed
  } 
  else {
    return "auto"; // Automatic margin for other cases
  }
};

// Check if the next message is from a different sender to decide whether to show the sender's name
export const isSameSender = (messages, currentMessage, index, userId) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== currentMessage.sender._id ||
      messages[index + 1].sender._id === undefined) &&
    currentMessage.sender._id !== userId
  );
};

// Check if the current message is the last message in the chat from a different sender
export const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

// Check if the previous message is from the same sender as the current message
export const isSameUser = (messages, currentMessage, index) => {
  return index > 0 && messages[index - 1].sender._id === currentMessage.sender._id;
};

// Get the name of the other user in a one-on-one chat


export const getSender = (loggedUser, users) => {
  if (!loggedUser || !users || users.length < 2) return null;
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  if (!loggedUser || !users || users.length < 2) return null;
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
