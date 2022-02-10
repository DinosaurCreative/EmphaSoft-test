import { useEffect, useState } from 'react';

function NotificationPopup({ isPopupShowed, hidePopupHandler, message, isActionOk }) {
  const [ svgClassList, setSvgClassList ] = useState('');
  
  useEffect(() => {
    setSvgClassList(() => {
      return isActionOk && !Boolean(message) ? 'notification-popup__img_success notification-popup__img_no-msg'
                                              : isActionOk && Boolean(message) 
                                              ? 'notification-popup__img_success'
                                              : 'notification-popup__img_error'
    })
  }, [isPopupShowed, isActionOk])

  return (
    <div className={`notification-popup_hidden ${isPopupShowed && 'notification-popup_visible'}`} onClick={hidePopupHandler}>
      <svg className={svgClassList}/>
      <p className='notification-popup__message'>{message}</p>
    </div>
  ) 
}

export default NotificationPopup;
