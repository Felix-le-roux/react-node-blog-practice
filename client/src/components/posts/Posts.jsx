import Post from '../post/Post';

const Posts = ({ posts }) => {
  return (
    <div className='posts'>
      {posts.map((p) => (
        <Post post={p} key={p.title + new Date().toDateString()} />
      ))}
    </div>
  );
};

export default Posts;
