// import React from 'react';
// import ReactDOM from 'react-dom';

// import {
//     ReactiveBase,
//     DataSearch,
//     ReactiveList,
//     ResultCard,
//     SelectedFilters,
//     MultiDataList
// } from '@appbaseio/reactivesearch';
// import styled from 'styled-components'

// const Element = ({ className }) => (
//     <div className={className}>
//         <ReactiveBase
//             app="good-books-ds"
//             url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
//             enableAppbase
//             appbaseConfig={{
//                 recordAnalytics: true,
//             }}
//         >
//             <div className="row">
//                 <div className="col">
//                     <DataSearch
//                         title="DataSearch"
//                         dataField={['original_title', 'original_title.search']}
//                         componentId="BookSensor"
//                         URLParams
//                         enableRecentSearches
//                         enablePopularSuggestions
//                         size={5}
//                     />
//                     <MultiDataList
//                         componentId="MeetupTops"
//                         dataField="original_title"
//                         data={[
//                             {
//                                 label: 'harry',
//                                 value: 'harry',
//                             },
//                             {
//                                 label: 'Travel',
//                                 value: 'Travel',
//                             },
//                             {
//                                 label: 'Outdoors',
//                                 value: 'Outdoors',
//                             },
//                         ]}
//                         title="Meetups"
//                         showSearch={false}
//                         showCheckbox={true}
//                         placeholder="Filter meetups"
//                         defaultValue={['Social']}
//                         selectAllLabel="All meetups"
//                         showFilter={true}
//                         filterLabel="Price"
//                         URLParams={false}
//                     />
//                 </div>

//                 <div className="col">
//                     <SelectedFilters />
//                     <ReactiveList
//                         componentId="SearchResult"
//                         dataField="original_title"
//                         size={10}
//                         className="result-list-container"
//                         pagination
//                         react={{
//                             and: 'BookSensor',
//                         }}
//                         render={({ data }) => (
//                             <ReactiveList.ResultCardsWrapper>
//                                 {data.map(item => (
//                                     <ResultCard id={item._id} key={item._id}>
//                                         <ResultCard.Image src={item.image} />
//                                         <ResultCard.Title>
//                                             <div
//                                                 className="book-title"
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: item.original_title,
//                                                 }}
//                                             />
//                                         </ResultCard.Title>

//                                         <ResultCard.Description>
//                                             <div className="flex column justify-space-between">
//                                                 <div>
//                                                     <div>
//                                                         by{' '}
//                                                         <span className="authors-list">
//                                                             {item.authors}
//                                                         </span>
//                                                     </div>
//                                                     <div className="ratings-list flex align-center">
//                                                         <span className="stars">
//                                                             {/* eslint-disable */
//                                                                 Array(item.average_rating_rounded)
//                                                                     .fill('x')
//                                                                     .map((_, index) => (
//                                                                         <i
//                                                                             className="fas fa-star"
//                                                                             key={index}
//                                                                         />
//                                                                     ))
//                                                                 /* eslint-enable */
//                                                             }
//                                                         </span>
//                                                         <span className="avg-rating">
//                                                             ({item.average_rating} avg)
//                                                         </span>

//                                                     </div>
//                                                 </div>
//                                                 {/* <span className="pub-year"> */}
//                                                 {/* </span> */}
//                                             </div>
//                                         </ResultCard.Description>
//                                     </ResultCard>
//                                 ))}
//                             </ReactiveList.ResultCardsWrapper>
//                         )}
//                     />
//                 </div>
//             </div>
//         </ReactiveBase>
//     </div>
// );

// const ProductsTest = styled(Element)`
// body {
// 	max-width: 1200px;
// 	margin: 0 auto;
// 	padding-top: 15px;
// }

// .row {
// 	display: flex;
// 	flex-direction: row;
// 	width: 100%;
// }

// .col {
// 	flex: 1;
// 	padding: 15px;
// }

// .row > .col:first-child {
// 	border-right: 1px solid #ccc;
// 	max-width: 400px;
// }

// .row > .col:last-child {
// 	background: #fafafa;
// }

// .flex {
// 	display: flex;
// }

// .wrap {
// 	flex-wrap: wrap;
// }

// .column {
// 	flex-direction: column;
// }

// .align-center {
// 	align-items: center;
// }

// .justify-center {
// 	justify-content: center;
// }

// .justify-space-between {
// 	justify-content: space-between;
// }

// .text-center {
// 	text-align: center;
// }

// @media all and (max-width: 767px) {
// 	.row {
// 		flex-direction: column;
// 	}

// 	.row > .col:first-child {
// 		border-right: none;
// 		max-width: none;
// 	}
// }

// /* apps */

// .authors-list {
// 	color: #9d9d9d;
// 	font-weight: bold;
// }

// .ratings-list {
// 	padding: 10px 0;
// }

// .avg-rating {
// 	color: #6b6b6b;
// 	margin-left: 5px;
// }

// .stars {
// 	color: gold;
// }

// .location {
// 	color: salmon;
// 	margin-right: 5px;
// }

// .meetup-location {
// 	margin: 4px 0;
// }

// .book-title {
// 	white-space: normal;
// 	margin-top: 4px;
// }

// .book-title-card {
// 	white-space: normal;
// 	margin-top: 4px;
// 	max-height: 45px;
// }

// .book-image {
// 	height: 150px;
// 	width: 110px;
// 	background-size: cover;
// }

// .book-header {
// 	font-weight: bold;
// 	margin-bottom: 5px;
// }

// .book-content {
// 	background: white;
// 	margin: 10px 0;
// 	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
// }

// .meetup-title {
// 	white-space: normal;
// }

// .meetup-topics {
// 	height: 35px;
// 	overflow: hidden;
// }

// .meetup-topic {
// 	background-color: #dedede;
// 	color: #555;
// 	padding: 5px 10px;
// 	margin: 5px;
// 	border-radius: 4px;
// }

// .meetup-topic:first-child {
// 	margin-left: 0;
// }

// .col .meetup-list-image {
// 	background-size: cover;
// }

// `

// export default ProductsTest;
