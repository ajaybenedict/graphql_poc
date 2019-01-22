import * as React from 'react';
import { Link } from 'react-router-dom';
import Course from './course';
import { MemberEntity } from '../../model';
import { Query } from "react-apollo";
import gql from "graphql-tag";

interface Props {
  //member: MemberEntity;
}

export const MemberRow: React.StatelessComponent<Props> = () => {
  const GET_COURSE = gql`
  {
    allcourses {
      id
      title
      author
      description
      topic
      url
    }
  }
`;
  return (
    <Query
      query={GET_COURSE}>
      {({ loading, error, data }) => {
        if (loading) return <tr><td>Loading...</td></tr>;
        if (error) return <tr><td>Error :(</td></tr>;
        console.log("data.course",data);
        
        return data.allcourses.map((currentCourse, index) => (
        //return (
          <Course key={index} course={currentCourse} />
        //)
         ));
      }}
    </Query>
  );
  {/*return (
    <tr>
      <td>
        <img src={member.avatar_url} className="avatar" />
        <Link
          to={`/member/${member.id}`}
        >
          {member.id}
        </Link>
      </td>
      <td>
        <Link
          to={`/memberDetail/${member.id}`}
        >
          {member.id}
        </Link>
        
      </td>
      <td>
        <span>{member.login}</span>
      </td>
   </tr> 

  );*/ }
};
