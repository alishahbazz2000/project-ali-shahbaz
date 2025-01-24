import { createRoot } from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "./style/index.css";

import App, { loader as appLoader } from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
} from "react-router";
import HomePage, {
  loader as homePageLoader,
  action as homePageAction,
} from "./pages/home.jsx";
import ContactUsPage, {
  loader as contactusLoader,
  action as contactusAction,
} from "./pages/contactUs.jsx";
import AdminLayoutPage from "./pages/adminLayout.jsx";
import NotFoundPage from "./pages/404.jsx";
import LoginPage, { action as loginAction } from "./pages/login.jsx";
import SignUpPage, { action as signUpAction } from "./pages/signUp.jsx";
import ProtectedRoute from "./utils/protectedRoute.jsx";
import PostLayoutPage from "./pages/postLayout.jsx";
import PostPage, { loader as postPageLoader } from "./pages/post.jsx";
import EventLayoutPage from "./pages/eventLayout.jsx";
import EventPage, { loader as eventPageLoader } from "./pages/event.jsx";
import PostDetailsPage, {
  loader as postDetailsLoader,
  action as postDetailsAction,
} from "./pages/postDetails.jsx";
import EventDetailsPage, {
  loader as eventDetailsLoader,
} from "./pages/evnetDetails.jsx";
import AdminIndexPage, {
  loader as adminIndexLoader,
  action as adminIndexAction,
} from "./pages/adminIndex.jsx";
import AdminPostLayout from "./pages/adminPostLayout.jsx";
import AdminPostTableLayout, {
  loader as adminPostLoader,
  action as adminPostAction,
} from "./pages/adminPostTable.jsx";
import AdminPostCreate, {
  action as AdminPostCreateAction,
  loader as adminPostCreateLoader,
} from "./pages/adminPostCreate.jsx";
import AdminEventLayout from "./pages/adminEventLayout.jsx";
import AdminEventTableLayout, {
  loader as adminEventTableLoader,
  action as adminEventTableAction,
} from "./pages/adminEventTable.jsx";
import AdminEventCreatePage, {
  loader as adminEventLoader,
  action as adminEventAction,
} from "./pages/adminEventCreate.jsx";
import AdminUserLayout, {
  loader as adminUserLayoutLoader,
  action as adminUserLayoutAction,
} from "./pages/adminUserLayout.jsx";
import AdminSettings, {
  loader as adminSettingLoader,
  action as adminSettingAction,
} from "./pages/adminSettings.jsx";
import AdminCategoryPage, {
  action as adminCategoryAction,
  loader as adminCategoryLoader,
} from "./pages/adminCategory.jsx";
import AdminCategoryDetials, {
  loader as adminCategoryDetailsLoader,
} from "./pages/adminCategoryDetails.jsx";
import AdminPostDetails, {
  loader as adminPostDetailsLoader,
} from "./pages/adminPostDetails.jsx";
import ProfilePage, {
  loader as profileLoader,
  action as profileAction,
} from "./pages/profile.jsx";
import AdminCommentPage, {
  loader as adminCommentLoader,
  action as adminCommentAction,
} from "./pages/adminComments.jsx";
import AdminEventDetails, {
  loader as adminEventDetailsLoader,
} from "./pages/adminEventDetails.jsx";
import UserProfile, {
  loader as userProfileLoader,
} from "./pages/profileInfo.jsx";
import ForgetPassWord, {
  action as forgetPasswordAction,
} from "./pages/forgetPassword.jsx";
import ForgetPasswordChange, {
  action as forgetPasswordChangeAction,
} from "./pages/forgetPasswordChange.jsx";

const publicRoutes = (
  <Route key="publicRoutes">
    <Route path="auth/login" element={<LoginPage />} action={loginAction} />
    <Route
      path="auth/forgetpassword"
      element={<ForgetPassWord />}
      action={forgetPasswordAction}
    />
    <Route
      path="auth/forgetpassword/:id"
      element={<ForgetPasswordChange />}
      action={forgetPasswordChangeAction}
    />
    <Route path="auth/signup" element={<SignUpPage />} action={signUpAction} />
  </Route>
);

const protectedRoutes = (
  <Route element={<ProtectedRoute />} key="protectedRoutes">
    <Route
      path="/:lang?/"
      Component={HomePage}
      handle={{ title: "Home Page" }}
      loader={homePageLoader}
      action={homePageAction}
    />
    <Route
      path="profile/user/:id"
      element={<UserProfile />}
      loader={userProfileLoader}
    />
    <Route
      path="profile/:id"
      element={<ProfilePage />}
      loader={profileLoader}
      action={profileAction}
    />
    <Route path="post" element={<PostLayoutPage />}>
      <Route index element={<PostPage />} loader={postPageLoader} />
      <Route
        path=":id"
        element={<PostDetailsPage />}
        loader={postDetailsLoader}
        action={postDetailsAction}
      />
    </Route>
    {/*  */}
    <Route path="event" element={<EventLayoutPage />}>
      <Route index element={<EventPage />} loader={eventPageLoader} />
      <Route
        path=":id"
        element={<EventDetailsPage />}
        loader={eventDetailsLoader}
      />
    </Route>
    {/*  */}
    <Route
      path="contactus"
      Component={ContactUsPage}
      loader={contactusLoader}
      action={contactusAction}
    />
    {/* admin Routes */}
    <Route path="admin" element={<AdminLayoutPage />}>
      <Route
        index
        element={<AdminIndexPage />}
        loader={adminIndexLoader}
        action={adminIndexAction}
      />
      <Route
        path="category"
        element={<AdminCategoryPage />}
        action={adminCategoryAction}
        loader={adminCategoryLoader}
      />
      <Route
        path="category/:id"
        element={<AdminCategoryDetials />}
        loader={adminCategoryDetailsLoader}
      />
      <Route
        path="category/:id/edit"
        element={<AdminCategoryPage />}
        action={adminCategoryAction}
        loader={adminCategoryLoader}
      />
      <Route path="post" element={<AdminPostLayout />}>
        <Route
          index
          element={<AdminPostTableLayout />}
          loader={adminPostLoader}
          action={adminPostAction}
        />
        <Route
          path="create"
          element={<AdminPostCreate />}
          action={AdminPostCreateAction}
          loader={adminPostCreateLoader}
        />
        <Route
          path=":id"
          element={<AdminPostDetails />}
          loader={adminPostDetailsLoader}
        />
        <Route
          path=":id/edit"
          element={<AdminPostCreate />}
          action={AdminPostCreateAction}
          loader={adminPostCreateLoader}
        />
      </Route>
      <Route path="event" element={<AdminEventLayout />}>
        <Route
          index
          element={<AdminEventTableLayout />}
          loader={adminEventTableLoader}
          action={adminEventTableAction}
        />
        <Route
          path="create"
          element={<AdminEventCreatePage />}
          loader={adminEventLoader}
          action={adminEventAction}
        />
        <Route
          path=":id"
          element={<AdminEventDetails />}
          loader={adminEventDetailsLoader}
        />
        <Route
          path=":id/edit"
          element={<AdminEventCreatePage />}
          loader={adminEventLoader}
          action={adminEventAction}
        />
      </Route>
      <Route
        path="user"
        element={<AdminUserLayout />}
        loader={adminUserLayoutLoader}
        action={adminUserLayoutAction}
      />
      <Route
        path="setting/:id"
        element={<AdminSettings />}
        loader={adminSettingLoader}
        action={adminSettingAction}
      />
      <Route
        path="comment"
        element={<AdminCommentPage />}
        loader={adminCommentLoader}
        action={adminCommentAction}
      />
      ,
    </Route>
  </Route>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<App />}
      loader={appLoader}
      id="root"
      errorElement={<ErrorBoundary />}
    >
      {[publicRoutes, protectedRoutes]}
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

export function ErrorBoundary() {
  const error = useRouteError();
  console.log("🚀 ~ ErrorBoundary ~ error:", error);
  return <NotFoundPage error={error} />;
}
