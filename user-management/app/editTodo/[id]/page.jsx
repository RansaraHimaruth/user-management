// import React from 'react';
// import axios from 'axios';
// import EditTodo from '@/components/EditTodo';

// async function EditTopic({ params }) {
//   const { id } = params;
//   console.log('id: ', id);

//   const getTopicById = async (id) => {
//     try {
//       const response = await axios.get(`/api/topics/${id}`, { cache: 'no-store' });

//       if (response.status !== 200) {
//         throw new Error('Failed to fetch topic');
//       }

//       return response.data;
//     } catch (error) {
//       console.log('Error fetching topic: ', error);
//       return null;
//     }
//   };

//   const topicData = await getTopicById(id);

//   if (!topicData) {
//     return <div>Error loading topic</div>;
//   }

//   const { topic } = topicData;
//   const { title, description } = topic;
//   console.log('title: ', title);
//   console.log('description: ', description);

//   return (
//     <div>
//       <EditTodo id={id} title={title} description={description} />
//     </div>
//   );
// }

// export default EditTopic;
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditTodo from '@/components/EditTodo';

function EditTopic({ params }) {
  const { id } = params;
  const [topicData, setTopicData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopicById = async (id) => {
      try {
        console.log(`Fetching topic with id: ${id}`);
        const response = await axios.get(`/api/topics/${id}`, { cache: 'no-store' });
        console.log('API response:', response);

        if (response.status !== 200) {
          throw new Error('Failed to fetch topic');
        }

        setTopicData(response.data);
      } catch (error) {
        console.error('Error fetching topic:', error.message);
        console.error('Error details:', error.response ? error.response.data : 'No response data');
        setError('Error loading topic');
      } finally {
        setLoading(false);
      }
    };

    getTopicById(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!topicData) {
    return <div>Error loading topic</div>;
  }

  const { topic } = topicData;
  const { title, description } = topic;
  console.log('title: ', title);
  console.log('description: ', description);

  return (
    <div>
      <EditTodo id={id} title={title} description={description} />
    </div>
  );
}

export default EditTopic;