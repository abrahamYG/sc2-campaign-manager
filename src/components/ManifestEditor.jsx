import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
class ManifestEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPane: ""
		};
	}

	render() {
		const {schema, uiSchema, itemData} = this.props;
		return (
			<Form 
				schema={schema}
				uiSchema={uiSchema}
				formData={itemData}
				onSubmit={(e)=>console.log(e)}
				onChange={(e)=>console.log(e)}
				onError={(e)=>console.log(e)}
			/>
		);
	}
}

export default ManifestEditor;