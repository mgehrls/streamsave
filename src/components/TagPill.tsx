export default function TagPill({
  tag,
} // deletable,
: {
  key: number;
  tag: { id: number; name: string };
  deletable?: boolean;
}) {
  // const [confirmDelete, setConfirmDelete] = useState(false);
  // const { removeTagById, removingTag } = useListActions();

  const defaultClasses =
    "rounded-md bg-slate-200 px-1 py-0.5 text-xs tracking-wider text-black";
  // const deletableClasses =
  //   "flex items-center gap-3 rounded-md border-r-2 border-black bg-slate-200 px-2 py-1 text-red-800";
  // const confirmDeleteClasses =
  //   "flex items-center gap-3 rounded-l-md border-r-2 border-black bg-slate-200 px-2 py-1 text-red-800";
  return (
    <>
      {/* {removingTag && <Loading />} */}

      <div className={defaultClasses}>
        {tag.name}
        {/* <button
          disabled={!deletable}
          className={defaultClasses}
          key={tag.id}

        >
          {deletable && <FaX />}
        </button>
        {deletable && confirmDelete && (
          <button
            className="flex items-center gap-3 rounded-r-md bg-slate-200 px-2 py-1 text-black"
            onClick={() => setConfirmDelete(false)}
          >
            Keep it
          </button>
        )} */}
      </div>
    </>
  );
}
