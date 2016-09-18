import React from 'react'
import _ from 'lodash'

export class FilterableProductTable extends React.Component {
    render() {
        let groupedProds = _.groupBy(this.props.products, 'category')
          , data = _.map(_.keys(groupedProds), key => {return {name: key, products: groupedProds[key]}})
        return (
            <div>
                <SearchBar />
                <ProductTable products={data}/>
            </div>
        )
    }
}

export class SearchBar extends React.Component {
    render() {
        return (
            <input type='search' name='product-search' placeholder='Search...'></input>
        )
    }
}

export class ProductTable extends React.Component {
    render() {
        console.log(JSON.stringify(this.props.products))
        let content = this.props.products.map(category => {
            let products = category.products.map(product =>
                <ProductRow product={product} key={product.name}/>
            )
            return [<ProductCategoryRow productCategory={category} key={category.name}/>]
                .concat(products)
        }).reduce((content, items) => content.concat(items), [])

        return (
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        )
    }
} 

export class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <td colSpan='2'>{this.props.productCategory.name}</td>
            </tr>
        )
    }
}

export class ProductRow extends React.Component {
    render() {
        return (
            <tr>
                <td>this.props.product.name</td>
                <td>this.props.product.price</td>
            </tr>
        )
    }
}