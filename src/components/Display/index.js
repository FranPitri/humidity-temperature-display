import React, {Component} from 'react'
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid} from 'recharts'
import axios from 'axios'
import moment from 'moment'
import { SERVER_URL, SHOULD_MOCK } from '../../config';
import './Display.css'

class Display extends Component {

    constructor() {
        super()
        this.state = {
            data : []
        }
    }

    componentWillMount() {
        setInterval(() => {
            this._fetchData()
        }, 3000)
    }

    _fetchData = async () => {
        /* Fetch data from sv or mock */
        if (SHOULD_MOCK) {
            this.setState({
                data : [
                    ...( this.state.data.length > 7 ? this.state.data.slice(1) : this.state.data),
                    {temperature: Math.floor(Math.random() * 81) , humidity: Math.floor(Math.random() * 101), time: moment().format('h:mm:ss a')}
                ]
            })
            return
        }
        const sample = await axios.get(SERVER_URL + 'getData/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        this.setState({
            data : [
                ...( this.state.data.length > 7 ? this.state.data.slice(1) : this.state.data),
                {
                    temperature: sample.data.temperature,
                    humidity: sample.data.humidity,
                    time: moment(sample.data.time).format('h:mm:ss a')
                }
            ]
        })
    }

    render() {
        return (
            <div className={'Wrapper'}>
                <div className={'Kajita'}>
                    <div className={'TextBox'}>
                        <div className={'Time'}>
                            <div className={'TimeText'}>Last sample</div>
                            <div className={'TimeValue'}>
                                { this.state.data.length > 0 ? this.state.data.slice(-1)[0].time : 'No samples'}
                            </div>
                        </div>
                    </div>
                    <div className={'TextBox'}>
                        <div className={'Text'}>
                            <div className={'Ball'} style={{backgroundColor: '#F44336'}}></div>
                            <div className={'Name'}>Temperature</div>
                        </div>
                    </div>
                    <div className={'TextBox'}>
                        <div className={'Text'}>
                            <span className={'Ball'} style={{backgroundColor: '#2196F3'}}></span>
                            <span className={'Name'}>Humidity</span>
                        </div>
                    </div>
                </div>
                <div className={'Graphs'}>
                    <div className={'Container'}>
                        <LineChart width={700} height={200} data={this.state.data}
                                   margin={{top:10, right: 20}}>
                            <XAxis dataKey="time" hide/>
                            <YAxis hide/>
                            <Tooltip/>
                            <CartesianGrid stroke="#ddd" strokeDasharray="5 5"/>
                            <Line type="monotone" dataKey="temperature" stroke="#F44336" />
                        </LineChart>
                    </div>
                    <div className={'Container'}>
                        <LineChart width={700} height={200} data={this.state.data}
                                   margin={{top:10, right: 20}}>
                            <XAxis dataKey="time" hide/>
                            <YAxis hide/>
                            <Tooltip/>
                            <CartesianGrid stroke="#ddd" strokeDasharray="5 5"/>
                            <Line type="monotone" dataKey="humidity" stroke="#2196F3" />
                        </LineChart>
                    </div>
                </div>
            </div>
        )
    }

}

export default Display