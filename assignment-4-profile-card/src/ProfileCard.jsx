function ProfileCard({ name, role, description, imageUrl }) {
  return (
    <div className="profile-card">
      <img className="profile-photo" src={imageUrl} alt={name} />
      <h2 className="profile-name">{name}</h2>
      <p className="profile-role">{role}</p>
      <p className="profile-description">{description}</p>
    </div>
  )
}

export default ProfileCard
