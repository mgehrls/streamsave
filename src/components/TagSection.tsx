import TagPill from "./TagPill";
import type { MongoListItem } from "~/utils/types";

export default function TagSection({ listItem }: { listItem: MongoListItem }) {
  // const [addTag, setAddTag] = useState(false);
  // const [deleteTags, setDeleteTags] = useState(false);
  // const { addNewTag, addTagById, addingExistingTag, addingNewTag } =
  //   useListActions();

  // function handleSubmitNewTag() {
  //   const newTagInput = document.getElementById(
  //     "newTagInput",
  //   ) as HTMLInputElement;
  //   if (!newTagInput) return;
  //   if (newTagInput.value.length < 3) return;

  //   const enteredValue = newTagInput.value;

  //   // Check if the entered value exists in the list of options
  //   const options = document.getElementById("newTag") as HTMLDataListElement;
  //   if (!options) return;
  //   const selectedOption = Array.from(options.options).find(
  //     (option) => option.value === enteredValue,
  //   );

  //   if (selectedOption) {
  //     if (listItem)
  //       addTagById({ tagId: parseInt(selectedOption.id), id: listItem.id });
  //     setAddTag(false);
  //   } else {
  //     if (listItem) {
  //       // addNewTag({ name: enteredValue, listItemId: listItem.id });
  //       setAddTag(false);
  //     }
  //   }
  // }

  return (
    <div className="flex w-full flex-wrap gap-2 p-2">
      {listItem.media.tags.map((tag) => {
        return (
          <TagPill
            key={tag.id}
            tag={tag}
            // deletable={deleteTags}
          />
        );
      })}
      {/* {addTag && (
        <>
          <input
            id="newTagInput"
            pattern="[a-z\/-]+"
            autoFocus
            onSelect={() => console.log("selected")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmitNewTag();
              }
              if (e.key === "Escape") {
                setAddTag(false);
              }
            }}
            className="w-28 rounded-md bg-slate-200 px-1 py-0.5 text-xs tracking-wider text-black"
            list="newTag"
          />
          <datalist id="newTag">
            {allTags.map((tag) => {
              if (!listItem?.tags.find((genre) => genre.id === tag.id)) {
                return (
                  <option
                    key={tag.id}
                    id={tag.id.toString()}
                    value={tag.name}
                  />
                );
              }
            })}
          </datalist>
          {addingExistingTag || addingNewTag ? (
            <div>
              <Loading />
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  handleSubmitNewTag();
                }}
              >
                <FaPlus />
              </button>
              <button onClick={() => setAddTag(false)}>
                <FaX />
              </button>
            </>
          )}
        </>
      )}
      {!addTag && (
        <button
          className="flex items-center"
          onClick={() => {
            setDeleteTags(false);
            setAddTag(true);
          }}
        >
          <span className="flex items-center rounded-md bg-slate-200 px-1 py-0.5 text-xs tracking-wider text-black">
            add tag...
            <FaPlus />
          </span>
        </button>
      )}
      {deleteTags && (
        <button className="ml-auto" onClick={() => setDeleteTags(false)}>
          <FaX />
        </button>
      )}
      {!deleteTags && !listItem.tags.length === false && (
        <button onClick={() => setDeleteTags(true)} className="ml-auto">
          <FaGear />
        </button>
      )} */}
    </div>
  );
}
