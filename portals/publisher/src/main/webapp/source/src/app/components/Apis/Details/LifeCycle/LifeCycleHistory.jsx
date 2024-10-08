/*
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Person from '@mui/icons-material/Person';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormattedMessage, useIntl } from 'react-intl';

const PREFIX = 'LifeCycleHistory';

const classes = {
    firstCol: `${PREFIX}-firstCol`,
    personIcon: `${PREFIX}-personIcon`,
    avatar: `${PREFIX}-avatar`
};

const StyledPaper = styled(Paper)((
    {
        theme
    }
) => ({
    [`& .${classes.firstCol}`]: {
        width: 100,
    },

    [`& .${classes.personIcon}`]: {
        fontSize: theme.typography.fontSize,
    },

    [`& .${classes.avatar}`]: {
        width: 25,
        height: 25,
    }
}));

const LifeCycleHistory = (props) => {
    const intl = useIntl();
    const LifeCycleStates = {
        CREATED: intl.formatMessage({
            id: 'Apis.Details.LifeCycle.State.Status.CREATED', defaultMessage: 'CREATED',
        }),
        PUBLISHED: intl.formatMessage({
            id: 'Apis.Details.LifeCycle.State.Status.PUBLISHED', defaultMessage: 'PUBLISHED',
        }),
        DEPRECATED: intl.formatMessage({
            id: 'Apis.Details.LifeCycle.State.Status.DEPRECATED', defaultMessage: 'DEPRECATED',
        }),
        RETIRED: intl.formatMessage({
            id: 'Apis.Details.LifeCycle.State.Status.RETIRED', defaultMessage: 'RETIRED',
        }),
        BLOCKED: intl.formatMessage({
            id: 'Apis.Details.LifeCycle.State.Status.BLOCKED', defaultMessage: 'BLOCKED',
        }),
        'PRE-RELEASED': intl.formatMessage({
            id: 'Apis.Details.LifeCycle.State.Status.PRE-RELEASED', defaultMessage: 'PRE-RELEASED',
        }),
    };
    return (
        <StyledPaper>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.firstCol}>
                            <FormattedMessage id='Apis.Details.LifeCycle.LifeCycleHistory.user' defaultMessage='User' />
                        </TableCell>
                        <TableCell>
                            <FormattedMessage
                                id='Apis.Details.LifeCycle.LifeCycleHistory.action'
                                defaultMessage='Action'
                            />
                        </TableCell>
                        <TableCell>
                            <FormattedMessage id='Apis.Details.LifeCycle.LifeCycleHistory.time' defaultMessage='Time' />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.lcHistory.reverse().map((entry) => entry.previousState && (
                        <TableRow key={entry.postState}>
                            <TableCell component='th' scope='row'>
                                <Avatar className={classes.avatar}>
                                    <Person className={classes.personIcon} />
                                </Avatar>
                                <div>{entry.user}</div>
                            </TableCell>
                            <TableCell>
                                <FormattedMessage
                                    id='Apis.Details.LifeCycle.LifeCycleHistory.lifecycle.state.history'
                                    defaultMessage='LC has changed from {previous} to {post}'
                                    values={{
                                        previous: entry.previousState in LifeCycleStates
                                            ? LifeCycleStates[entry.previousState] : entry.previousState,
                                        post: entry.postState in LifeCycleStates
                                            ? LifeCycleStates[entry.postState] : entry.postState,
                                    }}
                                />
                            </TableCell>
                            <TableCell>{moment(entry.updatedTime).fromNow()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledPaper>
    );
};
LifeCycleHistory.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    lcHistory: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default (LifeCycleHistory);
