import React, { useEffect, useState } from "react";
import UserInfoPallet from "../../components/UserInfoPallet";
import ErrorContainer from "../ErrorContainer";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataAsync,
  fetchUserDataAsync,
} from "../../../app/redux/bytes/searchByteSlice";

export default function LatestBytesListContainer({ queryWord }) {
  const dispatch = useDispatch();
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useSelector((state) => state.searchBytes);

  const [postsWithUserData, setPostsWithUserData] = useState([]);

  useEffect(() => {
    dispatch(fetchDataAsync({ queryWord }));
  }, [dispatch,queryWord]);

  useEffect(() => {
    if (postData.length > 0) {
      const fetchDataForPost = async (post) => {
        try {
          const userDataResponse = await dispatch(
            fetchUserDataAsync(post.userId)
          );
          const user = userDataResponse.payload;
          return { ...post, user };
        } catch (error) {
          console.error(
            `Failed to fetch user data for post ${post.postId}: ${error}`
          );
          return post; // If fetching user data fails, use the post data as is
        }
      };

      const fetchAllUserData = async () => {
        const postsWithUserData = await Promise.all(
          postData.map(fetchDataForPost)
        );
        setPostsWithUserData(postsWithUserData);
      };

      fetchAllUserData();
    }
  }, [dispatch, postData]);

  if (postLoading) {
    return <Loading />;
  }

  if (postError) {
    return <ErrorContainer />;
  }

  if (postData.length === 0) {
    return (
      <div className="w-full p-8 flex justify-center">
        <p className="text-primary_accent font-bold">Found nothing !</p>
      </div>
    );
  }

  return (
    <>
      {postsWithUserData.map((item) => (
        <div
          key={item.postId}
          className="text-primary flex justify-center mx-[0rem] my-6 px-8 py-0 border-0 border-secondary_accent"
        >
          <div
            style={{ maxWidth: "32rem" }}
            className="cursor-pointer  w-full max-w-[26rem] p-8 hover:bg-primary_hover rounded-md border border-secondary_accent"
          >
            <UserInfoPallet
              name={item.user.name}
              profile_image={item.user.profile_image}
              isGreenTick={item.user.isGreenTick}
            />
            <p 
            style={{ whiteSpace: 'pre-wrap' }}
            className="line-clamp-3 overflow-hidden my-4">
              {item.data.text}
            </p>
            <img
              src={item.data.imageUrl}
              className="w-full h-auto max-h-96 aspect-w-16 aspect-h-9 object-cover rounded-xl bg-blue-50"
            />
          </div>
        </div>
      ))}
    </>
  );
}
