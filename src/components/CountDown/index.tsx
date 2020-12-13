import React from 'react';

const CountDown = (props) => {
  const { day , hours , minutes , seconds  } = props;

  const [paused, setPaused] = React.useState(false);
  const [over, setOver] = React.useState(false);

  // time 默认值是一个 object
  const [time, setTime] = React.useState({
    days: parseInt(day),
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  });

  const tick = () => {
    // 暂停，或已结束
    if (paused || over) return;
    if (
      time.days === 0 &&
      time.hours === 0 &&
      time.minutes === 0 &&
      time.seconds === 0
    )
      setOver(true);
    else if (time.hours === 0 && time.minutes === 0 && time.seconds === 0)
      setTime({
        days: time.days - 1,
        hours: 23,
        minutes: 59,
        seconds: 59,
      });
    else if (time.minutes === 0 && time.seconds === 0)
      setTime({
        days: time.days,
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59,
      });
    else if (time.seconds === 0)
      setTime({
        days: time.days,
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59,
      });
    else
      setTime({
        days: time.days,
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
  };

  React.useEffect(() => {
    // 执行定时
    let timerID = setInterval(() => tick(), 1000);
    // 卸载组件时进行清理
    return () => clearInterval(timerID);
  },);

  return (
    <div>
      {`
      ${time.days.toString().padStart(2, '0')}天${time.hours
        .toString()
        .padStart(2, '0')}时${time.minutes
        .toString()
        .padStart(2, '0')}分${time.seconds.toString().padStart(2, '0')}秒`}
      <div>{over ? "报名结束!" : ''}</div>
    </div>
  );
};

export default CountDown;


