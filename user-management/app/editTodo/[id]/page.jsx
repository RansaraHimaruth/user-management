// import EditTodo from '@/components/EditTodo'
// import React from 'react'
// import axios from 'axios';

// async function EditTopic({params}) {
  
//   const {id} = params;
//   console.log('id: ',id);

//   const getTopicById = async (id) => {
//     try {
//       const response = await axios.get(`/api/topics/${id}` , {cache: "no-store"});

//       if (response.status !== 200) {
//         throw new Error('Failed to fetch topic');
//       }

//       return response.data;

//     } catch (error) {
//       console.log('Error fetching topic: ', error);
//     }
//   }

//   const {topic} = await getTopicById(id);
//   const {title, description} = topic;
//   console.log('title: ',title);
//   console.log('description: ',description);


//   return (
//     <div>
//       <EditTodo id={id} title={title} description={description}/>
//     </div>
//   )
// }

// export default EditTopic

import EditTodo from '@/components/EditTodo'
import React from 'react'
import axios from 'axios';

async function EditTopic({params}) {
  
  const {id} = params;
  console.log('id: ',id);

  const getTopicById = async (id) => {
    try {
      const response = await axios.get(`/api/topics/${id}`);
      console.log('API response:', response);

      if (response.status !== 200) {
        throw new Error('Failed to fetch topic');
      }

      return response.data;

    } catch (error) {
      console.log('Error fetching topic: ', error);
      console.error('Error details:', error.response ? error.response.data : 'No response data');
      
    }
  }

  const topicData = await getTopicById(id);

  if (!topicData) {
    return <div>Error loading topic</div>; // Handle the error case
  }

  const { topic } = topicData;
  const { title, description } = topic;
  console.log('title: ', title);
  console.log('description: ', description);

  return (
    <div>
      <EditTodo id={id} title={title} description={description} />
    </div>
  )
}

export default EditTopic
