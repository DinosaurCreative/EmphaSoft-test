function UserLine({...props}) {
  const { id, username, first_name, last_name } = props;

  return(
    <li className="userline">
      <p className="userline__parametr">{id}</p>
      <p className="userline__parametr">{username}</p>
      <p className="userline__parametr">{first_name}</p>
      <p className="userline__parametr">{last_name}</p>
    </li>
  )
}

export default UserLine;