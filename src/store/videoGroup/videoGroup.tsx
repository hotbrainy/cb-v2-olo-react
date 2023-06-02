//  TODO: review this module... seems to be unused, so could be deleted ???

import _ from "lodash";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { extractVideoGroupFromContentful } from "src/components/display/video-group/video-group";

const proxyBaseUrl = '/contentful-proxy';

const proxyConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const proxy = axios.create(proxyConfig);

export const apiGetEntry = createAsyncThunk(
  "videogroup/fetchPageContent",
  async ({ config }: any): Promise<any> => {
    // Fetch items from Contentful
    const entryId = "1EIOn4rKg4i9XmubegF9Vb";
    const contentTypeId = "videoGroup";
    const response = await proxy.post(`${config.app.URL}${proxyBaseUrl}`, {
      content_type: contentTypeId,
    });
    const entryItems = response.data;

    if (_.isEmpty(entryItems) || entryItems.total < 1) {
      throw new Error(`Missing Contentful Content: ${entryId}`);
    }

    // Transform the Contentful payload
    return (entryItems?.items || []).map((entry: any) => {
      const fields = entry!.fields as any;
      const content_type_id = entry.sys.contentType.sys.id;
      console.log("contentType: ", content_type_id);
      return extractVideoGroupFromContentful(fields);
    });
  }
);

interface IVideoGroupState {
  contentful: any | null;
  loading: boolean;
  error: Error | string | null;
}

export const initialState: IVideoGroupState = {
  contentful: null,
  loading: false,
  error: (null as unknown) as string,
};

export const videoGroupSlice = createSlice({
  name: "videoGroup",
  initialState,
  extraReducers: (builder) => {
    /*
     * apiGetEntry Cases
     */
    builder.addCase(apiGetEntry.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });

    builder.addCase(apiGetEntry.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.loading = false;
    });

    builder.addCase(apiGetEntry.fulfilled, (state, action) => {
      state.error = null;
      state.contentful = { ...action.payload };
      state.loading = false;
    });
  },

  reducers: {},
});

const { actions, reducer } = videoGroupSlice;
export default reducer;
