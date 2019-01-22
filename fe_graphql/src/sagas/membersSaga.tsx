import "regenerator-runtime/runtime";
import { call, put } from 'redux-saga/effects';
import {memberAPI} from '../api/member';
import {fetchMembersCompletedAction} from '../components/members/actions';
import {MemberEntity} from '../model/memberEntity';
import { Query } from "react-apollo";
import gql from "graphql-tag";

// worker Saga: will be fired on LOAD_MEMBERS_REQUESTED actions
export function* fetchMembers() {
    let members: Array<MemberEntity>;

   /* const GET_COURSE = gql`
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
    `;*/
    const mapQueriesToProps = ({ ownProps, state }) => {
        return {
          data: {
            query: gql`
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
            `
          }
        }
      }
   
      console.log("fffff",mapQueriesToProps);
      
      
{/*<Query
      query={GET_COURSE}>
      {({ loading, error, data }) => {
        console.log("data.course:::::",data);

      }}
    </Query>*/}
    members = yield call(memberAPI.fetchMembersAsync);

    //console.log("sage",members);
    
    yield put(fetchMembersCompletedAction(members));
}