import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';

export default class about extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Title', field: 'title' },
                { title: 'Hostname', field: 'hostname' },
                { title: 'Starttime', field: 'starttime',  },
                { title: 'Endtime', field: 'endtime',  },
                { title: 'Room', field: 'room',  },
                { title: 'Track', field: 'track',  },
            ],
            data: [
                {title:'How the Heart Works with Jamie and Jackie Lakes',
                    hostname:'Jamie,Jackie',
                    starttime:'Wednesday, May 29th, 2019, 12:00:00 PM',
                    endtime:'Wednesday, May 29th, 2019, 1:00:00 PM',
                    room:'RM 200',
                    track:'Healthcare'},
                {title:'Intro to Cryptography with John McAfee',
                    hostname:'John McAfee',
                    starttime:'Wednesday, May 29th, 2019, 2:00:00 PM',
                    endtime:'Wednesday, May 29th, 2019, 3:00:00 PM',
                    room:'Main Hall',
                    track:'Security'},
            ]
        }
    }

    render() {
        return (
            <div>
                <div><AppBar style={{left:"400px"}}>
                    <Toolbar>
                        <Typography variant="h6">Fake Schedule</Typography>
                    </Toolbar>
                </AppBar>
                </div><br/><br/><br/>
            <MaterialTable
                title="Editable Preview"
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    const data = this.state.data;
                                    data.push(newData);
                                    this.setState({ data }, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    const data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data[index] = newData;
                                    this.setState({ data }, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    let data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data.splice(index, 1);
                                    this.setState({ data }, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                }}
            /></div>
        )
    }
}