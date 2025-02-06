import React from "react";

function LoadMoreBtn({ currPage, totalPages, onClick }) {
    return (
        <button
            disabled={currPage === totalPages}
            onClick={onClick}
            className="absolute px-5 py-2 mx-auto tracking-widest uppercase transition-all scale-90 -translate-x-1/2 border border-white rounded-tr-lg rounded-bl-lg cursor-pointer hover:bg-white hover:text-black hover:font-semibold rounded-tl-3xl rounded-br-3xl hover:scale-100 -bottom-12 left-1/2 whitespace-nowrap"
        >
            {currPage === totalPages ? "no more content" : "load more..."}
        </button>
    );
}

export default LoadMoreBtn;
