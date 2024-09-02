import React from 'react';
import { useEffect, useState } from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import * as styles from './countdown.module.css';


const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    if (countDownDate <= new Date().getTime()) return;

    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? `${styles.countdown} ${styles.danger}` : `${styles.countdown}`}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
}

const TimerDisplay = ({
  days,
  hours,
  minutes,
  seconds
}) => {
  return (
    <div className={styles.countdownWrapper}>
      <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
    </div>
  );
}

const Countdown = ({
  preAccessMessage,
  targetDate,
  openElement
}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return openElement;
  } else {
    return (
      <div className={styles.container}>
        {preAccessMessage?.raw && (
          <div className={styles.preAccessMessage}>
            {renderRichText(preAccessMessage)}
          </div>
        )}
        <TimerDisplay
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </div>
    );
  }
};

export default Countdown;
