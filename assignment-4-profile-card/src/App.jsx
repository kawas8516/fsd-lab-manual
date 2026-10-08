import './App.css'
import ProfileCard from './ProfileCard'

const students = [
  {
    id :1,
    name: 'Aarav Sharma',
    role: 'Full Stack Developer',
    description: 'Passionate about building scalable web applications using the MERN stack.',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id : 2,
    name: 'Isha Patel',
    role: 'UI/UX Designer',
    description: 'Loves crafting clean, user-friendly interfaces with a focus on accessibility.',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id : 3,
    name: 'Rohan Mehta',
    role: 'Backend Engineer',
    description: 'Focused on building robust APIs and optimizing database performance.',
    imageUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
]

function App() {
  return (
    <div className="app">
      <h1 className="page-title">SY MCA Student Profiles</h1>
      <div className="profile-list">
        {students.map((student) => (
          <ProfileCard key={student.id} {...student} />
        ))}
      </div>
    </div>
  )
}

export default App
