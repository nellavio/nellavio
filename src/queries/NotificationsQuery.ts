import { gql } from "@apollo/client";

export const NOTIFICATIONS_QUERY = gql`
  query GetNotifications {
    notifications {
      id
      title
      description
      time
      icon
      isNew
    }
  }
`;
