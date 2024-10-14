import { api } from "~/utils/api";

export default function useListActions(){

    const ctx = api.useUtils();

    const { mutate: addFavToList, isLoading: addingFav } =
    api.listItem.addListItem.useMutation({
      onSuccess: () => {
        //invalidate the cache, void tells typescript that we don't care to await the promise. It can happen in the background.
        void ctx.listItem.getUserList.invalidate();
      },
    });
  const { mutate: addWatchLaterToList, isLoading: addingWatchLater } =
    api.listItem.addListItem.useMutation({
      onSuccess: () => {
        //invalidate the cache, void tells typescript that we don't care to await the promise. It can happen in the background.
        void ctx.listItem.getUserList.invalidate();
      },
    });

  // const { mutate: removeFromList, isLoading: removing } =
  //   api.listItem.deleteListItem.useMutation({
  //     onSuccess: () => {
  //       void ctx.listItem.getUserList.invalidate();
  //     },
  //   });

  // const { mutate: changeWatchLaterValue, isLoading: updating } =
  //   api.listItem.changeWatchLaterValue.useMutation({
  //     onSuccess: () => {
  //       void ctx.listItem.getUserList.invalidate();
  //     },
  //   });

  // const { mutate: addTagById, isLoading: addingExistingTag } =
  //   api.listItem.addTagById.useMutation({
  //     onSuccess: () => {
  //       void ctx.listItem.getUserList.invalidate();
  //     },
  //   });
  
  // const { mutate: addNewTag, isLoading: addingNewTag} =
  //   api.listItem.addNewTag.useMutation({
  //     onSuccess: () => {
  //       void ctx.listItem.getUserList.invalidate();
  //       void ctx.listItem.getAllTags.invalidate();
  //     },
  //   });
  
  //   const { mutate: removeTagById, isLoading: removingTag} = 
  //   api.listItem.removeTagById.useMutation({
  //       onSuccess: () => {
  //           void ctx.listItem.getUserList.invalidate();
  //       }
  //   })


    return { addFavToList, addWatchLaterToList, addingFav, addingWatchLater }

}