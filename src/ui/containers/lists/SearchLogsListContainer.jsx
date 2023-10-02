import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import LogThumb from "../../components/LogThumb";
import {
  fetchDataAsync,
  fetchUserDataAsync,
} from "../../../app/redux/logs/searchLogsSlice";
import ErrorContainer from "../ErrorContainer";

export default function LatestLogsListContainer({queryWord}) {
  const dispatch = useDispatch();
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useSelector((state) => state.searchLogs);

  const [postsWithUserData, setPostsWithUserData] = useState([]);

  useEffect(() => {
    dispatch(fetchDataAsync({queryWord}));
  }, [dispatch,queryWord]);

  useEffect(() => {
    if (postData.length > 0) {
      const fetchDataForPost = async (post) => {
        try {
          const userDataResponse = await dispatch(fetchUserDataAsync(post.userId));
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
    return <Loading/>;
  }

  if (postError) {
    return <ErrorContainer/>;
  }

  if (postData.length===0){
    return (
        <div className="w-full p-8 flex justify-center">
            <p className="text-primary_accent font-bold">Found nothing !</p>
        </div>
    )
  }

  return (
    <>
      {postsWithUserData.map((item) => (
        <div className="mx-0" key={item.postId}>
          {console.log(item.user?.name + " " + item.postId)}
          <LogThumb
            postId={item.postId}
            userData={item.user}
            title={item.data?.title}
            subtitle={item.data?.subtitle}
            timeStamp={item.timeStamp}
            upvotes={item.likes}
            image={item.data?.coverImageUrl}
          />
        </div>
      ))}
    </>
  );
}
