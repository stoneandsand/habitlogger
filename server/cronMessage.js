const db = require('../db/index.js');
const CronJob = require('cron').CronJob;
const sendMessage = require('./sendsms.js').sendMessage;

const compareTimeAndSend = (user, now, cb) => {
  let timeLeft = (user.deadline - now)/(1000 * 60);
  // console.log('before timechecks', 'timeLeft: ', timeLeft)
  if(timeLeft <= 1440 && timeLeft >= 0){ // less than 1 day(minutes) left && not overdue
    // console.log('after time checks')
    sendMessage(user.phoneNumb, user.habit, timeLeft)
    cb(user.habit, user.username)
  }
}

const sendMessageCron = new CronJob({
  cronTime: '0,10 * * * * *',
  onTick: function(){
    // console.log('running now!!')
    db.getInfo((list) => {
      list.forEach((user) => {
        const deadline = user.deadline;
        let now = Date.now();
        // console.log('before message sent:::')
        if(user.messageSent === false){
          // console.log('after message sent')
          compareTimeAndSend(user, now, (habit, name)=>{
           db.updateMessage(habit, name);
          });
        }
      })
    })
  },
  start: false,
});

// sendMessageCron.start();

module.exports = {
  sendMessageCron,
}