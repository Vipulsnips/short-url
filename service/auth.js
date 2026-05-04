const sessionIdToUserMap = new Map();
function setUser(user,sessionId){
  sessionIdToUserMap.set(sessionId,user);
}
function getUser(sessionId){
  return sessionIdToUserMap.get(sessionId);
}

module.exports={
  setUser,
  getUser,
}