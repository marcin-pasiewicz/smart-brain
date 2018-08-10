import React, {PureComponent} from 'react';

class Rank extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            emoji: '',
        }
    }

    generateEmoji = (entries) => {
        fetch(`https://66x68ytow3.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
            .then(res => res.json())
            .then(data => this.setState({emoji: data.input}))
            .catch(err => console.log(err))
    }

    componentDidMount() {
        const { entries } = this.props;

        this.generateEmoji(entries)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.entries !== this.props.entries) {
            this.generateEmoji(this.props.entries)
        }
    }
  render() {
      const { name, entries } = this.props;
      return (
          <div>
              <div className='white f3'>
                  {`${name}, your current entry count is...`}
              </div>
              <div className='white f1'>
                  {entries}
              </div>
              <div className='white f3'>
                  {`Rank Badge ${this.state.emoji}`}
              </div>
          </div>
      );
  }
}

export default Rank;