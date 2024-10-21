import { api } from "~/utils/api";
import { APIResult, MongoMedia } from "./types";
import { genresFromAPI } from "./genres";

export default function useListActions(){
  
  const ctx = api.useUtils();
  
    const { mutate: addFavToList, isLoading: addingFav } =
    api.listItem.addListItem.useMutation({
      onSuccess: () => {
        void ctx.listItem.getUserList.invalidate();
      },
    });
  const { mutate: addWatchLaterToList, isLoading: addingWatchLater } =
    api.listItem.addListItem.useMutation({
      onSuccess: () => {
        void ctx.listItem.getUserList.invalidate();
      },
    });

  const { mutate: removeFromList, isLoading: removing } =
    api.listItem.deleteListItem.useMutation({
      onError: (error) => {
        console.error('error', error);
      },
      onSettled: (data) => {
        console.log('settled', data);
      },
      onSuccess: () => {
        console.log('success')
        void ctx.listItem.getUserList.invalidate();
      },
    });

  const { mutate: changeWatchLaterValue, isLoading: updating } =
    api.listItem.changeWatchLaterValue.useMutation({
      onSuccess: () => {
        void ctx.listItem.getUserList.invalidate();
      },
    });

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


    return { addFavToList, addWatchLaterToList, addingFav, addingWatchLater, removeFromList, removing, changeWatchLaterValue, updating }

}