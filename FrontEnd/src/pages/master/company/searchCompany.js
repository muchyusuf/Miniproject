import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input'
 
import ViewCompany from './viewCompany'
 
const KEYS_TO_FILTERS = ['code']
 
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: '',
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }
 
  render () {
    const filteredView = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
 
    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        {filteredView.map(code => {
          return (
            <div className="code" key={code.id}>
              <div className="from">{ViewCompany.user.code}</div>
            </div>
          )
        })}
      </div>
    )
  }
 
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}