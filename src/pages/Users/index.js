import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'components';
import Container from './users.styles';
import { EmptyReport } from 'components';

const Users = ({ userData }) => {
  return (
    <Container>
      <header>
        <h1>User Lists</h1>
      </header>
      {!userData ? (
        <div className="loading-container">
          <Spinner size={'55px'} />
        </div>
      ) : (
        <>
          {userData.length === 0 ? (
            <EmptyReport />
          ) : (
            <div className="report-content">
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((item) => (
                      <tr key={item.userID}>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

Users.propTypes = {
  userData: PropTypes.array
};

export default Users;
