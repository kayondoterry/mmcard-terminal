function ProfileBar({ profilePic, name, cardNumber }) {
  return (
    <div className="flex flex-col sm:flex-row p-1">
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <div className="flex justify-center items-center"><img src={profilePic} alt="profile picture" className="w-20 h-20 lg:w-28 lg:h-28 rounded-full" /></div>
      <div className="flex-1 flex flex-col items-center sm:items-start justify-between px-4 py-4">
        <span className="text-2xl lg:text-4xl uppercase">{name}</span>
        <span className="font-light text-lg lg:text-2xl">CARD NO. {cardNumber}</span>
      </div>
    </div>
  );
}

export default ProfileBar;
