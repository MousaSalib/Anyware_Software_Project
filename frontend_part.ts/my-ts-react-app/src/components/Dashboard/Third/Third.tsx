import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './third.css';
import Forth from './Forth/Forth';

interface ProfilePhoto {
  url: string;
}

interface User {
  username: string;
  profilePhoto: ProfilePhoto;
}

interface Announcement {
  _id: string;
  title: string;
  category: string;
  content: string;
  updatedAt: string;
  user: User;
}

const Third: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/announcement');
        setAnnouncements(response.data.announcements);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="col-12 d-md-flex justify-content-between">
        <div className="col-md-8 col-12">
          {loading? <i className='fa fa-spin fa-spinner text-dark' style={{"fontSize": "30px"}}></i> : <>
          <div className="announcementTitle align-items-center d-flex justify-content-between border border-dark p-2 rounded">
            <h5 className=''>Announcements</h5>
            <p className='text-primary'>All</p>
          </div>
          {announcements.map((announcement, index) => (
            <div key={announcement._id} className={`card mb-3 mt-1 ${index < announcements.length - 1 ? 'mb-4' : ''}`}>
              <div className="p-3 row">
                <div className='col-md-4'>
                  <div className='d-flex align-items-center'>
                    <img className='profilePhoto me-2' src={announcement.user?.profilePhoto.url} alt="" />
                    <div>
                      <h4 className="card-title">{announcement.user?.username}</h4>
                      <p className='card-title text-primary'>{announcement.category}</p>
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <div className='card-body'>
                    <p className="card-text">{announcement.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>}
        </div>
        <div className="col-md-3 col-12 ms-md-3 ms-0">
            <Forth/>
        </div>
      </div>
    </>
  );
};

export default Third;











 
