import { useEffect, useState } from 'react';

function NotificationPopup({ isPopupShowed, hidePopupHandler, message, isRequestOk }) {
  const [ svgClassList, setSvgClassList ] = useState('');
  
  useEffect(() => {
    setSvgClassList(() => {
      return isRequestOk && !Boolean(message) ? 'notification-popup__img_success notification-popup__img_no-msg'
                                              : isRequestOk && Boolean(message) 
                                              ? 'notification-popup__img_success'
                                              : 'notification-popup__img_error'
    })
  }, [isPopupShowed, isRequestOk])

  return (
    <div className={`notification-popup_hidden ${isPopupShowed && 'notification-popup_visible'}`} >
      <svg className={svgClassList}/>
      <p className='notification-popup__message'>{message}</p>
    </div>
  ) 
}

export default NotificationPopup;
