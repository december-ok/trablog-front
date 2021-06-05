export default function Modify({ deletePost }: { deletePost: () => void }) {
  return (
    <div className="Modify">
      <button onClick={deletePost}>
        <i className="fas fa-trash" />
        <p>삭제</p>
      </button>
    </div>
  );
}
