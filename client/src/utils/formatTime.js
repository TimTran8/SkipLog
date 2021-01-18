export const formatTime = (timer) => {
  const getMilliSeconds = `0${(timer % 1000)}`.slice(-2) // timer = 1000ms
  // const getMilliSeconds = `0${(timer % 1000)}`.slice(-2) // timer = 10ms
  const getSeconds = `0${Math.floor((timer / 1000) % 60)}`.slice(-2) // 1000ms
  // const getSeconds = `0${Math.floor((timer / 100) % 60)}`.slice(-2) // 10ms
  // console.log(Math.floor((timer / 1000) % 60));
  // const minutes = `${Math.floor(timer / (60 * 1000) % 60)}`
  
  // const getMinutes = `0${minutes % 60}`.slice(-2)
  // const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
  // return `${getHours} : ${getMinutes} : ${getSeconds} :${getMilliSeconds}`
  return `${getSeconds} : ${getMilliSeconds}`
}
